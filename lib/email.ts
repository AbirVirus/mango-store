import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = "Rajshahi Mangoes <orders@rajshahimangoes.com>";

// Helper — only send if Resend is configured
async function safeSend(payload: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!resend) {
    console.warn("[EMAIL] RESEND_API_KEY not set — skipping email");
    return;
  }
  try {
    await resend.emails.send({ from: FROM, ...payload });
  } catch (err) {
    console.error("[EMAIL] Failed to send:", err);
  }
}

export async function sendOrderConfirmation(order: {
  _id: string;
  referenceId: string;
  customer: { name: string; phone: string };
  items: { variety: string; size: string; weight: number; pricePerKg: number; totalPrice: number }[];
  totalAmount: number;
  paymentMethod: string;
  orderStatus: string;
  createdAt: string;
}, customerEmail: string) {
  const itemsHtml = order.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee">${item.variety}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee">${item.size}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee">${item.weight} kg</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right">৳${item.totalPrice}</td>
        </tr>`
    )
    .join("");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  await safeSend({
    to: customerEmail,
    subject: `Order Confirmed — #${order.referenceId} | Rajshahi Mangoes`,
    html: `
      <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif">
        <div style="background:#166534;padding:24px;border-radius:12px 12px 0 0;text-align:center">
          <h1 style="color:#facc15;margin:0">Rajshahi Mangoes</h1>
          <p style="color:#fff;margin:4px 0 0">Order Confirmed!</p>
        </div>
        <div style="background:#fff;padding:24px;border:1px solid #e5e7eb;border-top:none">
          <p style="font-size:18px;margin:0 0 4px">Dear <strong>${order.customer.name}</strong>,</p>
          <p style="color:#6b7280;margin:0 0 16px">Thank you for your order! We're preparing your premium Rajshahi mangoes for delivery.</p>

          <div style="background:#f9fafb;padding:16px;border-radius:8px;margin-bottom:16px">
            <p style="margin:0 0 8px"><strong>Order Reference:</strong> #${order.referenceId}</p>
            <p style="margin:0 0 8px"><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString("en-BD", { dateStyle: "long" })}</p>
            <p style="margin:0"><strong>Status:</strong> ${order.orderStatus}</p>
          </div>

          <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
            <thead>
              <tr style="background:#f9fafb">
                <th style="padding:8px 12px;text-align:left;font-size:13px;color:#6b7280">Variety</th>
                <th style="padding:8px 12px;text-align:left;font-size:13px;color:#6b7280">Size</th>
                <th style="padding:8px 12px;text-align:left;font-size:13px;color:#6b7280">Qty</th>
                <th style="padding:8px 12px;text-align:right;font-size:13px;color:#6b7280">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div style="text-align:right;font-size:20px;font-weight:bold;color:#166534;margin-bottom:16px">
            Total: ৳${order.totalAmount}
          </div>

          <p style="margin:0 0 8px;color:#6b7280"><strong>Payment:</strong> ${order.paymentMethod}</p>
          <p style="margin:0 0 24px;color:#6b7280"><strong>Estimated Delivery:</strong> 2-3 business days</p>

          <div style="text-align:center">
            <a href="${siteUrl}/order-confirmation/${order._id}" style="display:inline-block;padding:12px 32px;background:#166534;color:#fff;border-radius:24px;text-decoration:none;font-weight:bold">View Order</a>
          </div>
        </div>
        <div style="text-align:center;padding:16px;color:#9ca3af;font-size:12px">
          Questions? Reply to this email.<br/>Team Rajshahi Mangoes
        </div>
      </div>
    `,
  });
}

export async function sendAdminNotification(order: {
  _id: string;
  referenceId: string;
  customer: { name: string; phone: string };
  items: { variety: string; weight: number; totalPrice: number }[];
  totalAmount: number;
  paymentMethod: string;
  createdAt: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.warn("[EMAIL] ADMIN_EMAIL not set — skipping admin notification");
    return;
  }

  const itemsSummary = order.items
    .map((i) => `<li>${i.variety} — ${i.weight}kg (৳${i.totalPrice})</li>`)
    .join("");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  await safeSend({
    to: adminEmail,
    subject: `New Order #${order.referenceId} — ৳${order.totalAmount} | Rajshahi Mangoes`,
    html: `
      <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif">
        <h2 style="color:#166534">New Order Received!</h2>
        <p><strong>Reference:</strong> #${order.referenceId}</p>
        <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString("en-BD")}</p>
        <hr/>
        <h3>Customer</h3>
        <p>Name: ${order.customer.name}<br/>Phone: ${order.customer.phone}</p>
        <h3>Items</h3>
        <ul>${itemsSummary}</ul>
        <h3>Total: ৳${order.totalAmount}</h3>
        <p>Payment: ${order.paymentMethod}</p>
        <hr/>
        <p><a href="${siteUrl}/admin/orders/${order._id}" style="color:#166534;font-weight:bold">View Order in Admin Panel</a></p>
      </div>
    `,
  });
}
