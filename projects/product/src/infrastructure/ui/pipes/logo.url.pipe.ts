import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'logoUrl',
  standalone: true,
})
export class LogoUrlPipe implements PipeTransform {
  private readonly validExtensions = [
    'png',
    'jpg',
    'jpeg',
    'webp',
    'svg',
    'gif',
  ];

  transform(url: string): string {
    if (!url || typeof url !== 'string') {
      return 'product.png';
    }

    const isValidUrl =
      url.startsWith('http://') ||
      url.startsWith('https://') ||
      url.startsWith('data:image');

    if (!isValidUrl) {
      return 'product.png';
    }

    // Validar extensión
    const extension = this.extractExtension(url);
    if (!extension || !this.validExtensions.includes(extension.toLowerCase())) {
      return 'product.png';
    }

    return url;
  }

  private extractExtension(url: string): string | null {
    try {
      const cleanUrl = url.split('?')[0].split('#')[0]; // remover query params o anchors
      const parts = cleanUrl.split('.');
      if (parts.length < 2) return null;

      return parts.pop() ?? null;
    } catch {
      return null;
    }
  }
}
