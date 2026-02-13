export function buildNoticiaEmail(
  titulo: string,
  extracto: string,
  slug: string
): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ufn.edu.mx";
  const articleUrl = `${siteUrl}/noticias/${slug}`;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #1e3a5f; color: white; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 20px;">Universidad Frontera Norte</h1>
      </div>
      <div style="border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; padding: 24px;">
        <h2 style="margin: 0 0 16px; font-size: 22px; color: #1e3a5f;">${titulo}</h2>
        <p style="margin: 0 0 20px; color: #374151; line-height: 1.6;">${extracto}</p>
        <div style="text-align: center; margin: 24px 0;">
          <a href="${articleUrl}" style="display: inline-block; background-color: #1e3a5f; color: white; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: 600; font-size: 14px;">
            Leer más
          </a>
        </div>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="font-size: 12px; color: #9ca3af; text-align: center;">
          Universidad Frontera Norte — J. B. Chapa 787 y Colón, Centro, Reynosa, Tamaulipas
        </p>
      </div>
    </div>
  `;
}
