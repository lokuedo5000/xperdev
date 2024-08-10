class Avatar {
  constructor(options = {}) {
    this.avatars = {};
    this.options = options;
  }

  get(initialsText, options = {}) {
    return this.avatars[initialsText]
      ? this.avatars[initialsText]
      : this.create(initialsText, options).response();
  }

  getNoCreate(initialsText) {
    return this.avatars[initialsText] || false;
  }

  create(initialsText, options = {}) {
    const defaultOpt = {
      color: "#fff",
      background: "#000",
      font: "Arial",
      fontSize: 20,
      centerH: true,
      centerV: true,
      width: 150,
      height: 150,
      textTransform: "uppercase",
      borderRadius: 0,
      shadow: false,
      shadowColor: "rgba(0, 0, 0, 0.5)",
      shadowBlur: 5,
      text3D: false,
      text3DColor: "#333",
      text3DOffset: 2,
    };

    const settings = {
      ...defaultOpt,
      ...this.options,
      ...options,
    };

    this.validateOptions(settings);

    // Si el fondo es "auto", generar un color aleatorio
    if (settings.background === "auto") {
      settings.background = this.randomBG(settings.color);
    }

    const avatarBase64 = this.createImgBase64(initialsText, settings);
    this.avatars[initialsText] = avatarBase64;

    return {
      response: () => avatarBase64,
    };
  }

  validateOptions(options) {
    if (typeof options.borderRadius === 'number') {
      const maxRadius = Math.min(options.width, options.height) / 2;
      options.borderRadius = Math.min(options.borderRadius, maxRadius);
    }
  }

  // Generar color de fondo aleatorio
  randomBG(textColor) {
    const randomColor = this.generateRandomColor();
    return this.ensureContrast(randomColor, textColor) ? randomColor : this.randomBG(textColor);
  }

  generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  ensureContrast(bgColor, textColor) {
    const bgLuminance = this.getLuminance(bgColor);
    const textLuminance = this.getLuminance(textColor);
    const contrastRatio = (Math.max(bgLuminance, textLuminance) + 0.05) / (Math.min(bgLuminance, textLuminance) + 0.05);
    return contrastRatio > 4.5; // Relación de contraste mínima recomendada para legibilidad
  }

  getLuminance(color) {
    const rgb = parseInt(color.slice(1), 16); // Convertir el color a un número
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722; // Calcular luminancia
  }

  createImgBase64(initialsText, options) {
    const canvas = this.createCanvas(options.width, options.height);
    const ctx = canvas.getContext("2d");

    this.drawBackground(ctx, options);
    this.drawText(ctx, initialsText, options);

    return canvas.toDataURL();
  }

  createCanvas(width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }

  drawBackground(ctx, options) {
    ctx.fillStyle = options.background;
    ctx.beginPath();
    this.drawRoundedRect(ctx, 0, 0, options.width, options.height, options.borderRadius);
    ctx.closePath();
    ctx.fill();
  }

  drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
  }

  drawText(ctx, text, options) {
    ctx.fillStyle = options.color;
    ctx.font = `${options.fontSize}px ${options.font}`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    const finalText = options.textTransform === "uppercase" ? text.toUpperCase() : text;
    const xPos = options.centerH ? options.width / 2 : 0;
    const yPos = options.centerV ? options.height / 2 : options.height / 2;

    if (options.shadow) {
      ctx.shadowColor = options.shadowColor;
      ctx.shadowBlur = options.shadowBlur;
      ctx.shadowOffsetX = options.text3D ? options.text3DOffset : 0;
      ctx.shadowOffsetY = options.text3D ? options.text3DOffset : 0;
    }

    if (options.text3D) {
      ctx.fillStyle = options.text3DColor;
      ctx.fillText(finalText, xPos + options.text3DOffset, yPos + options.text3DOffset);
      ctx.fillStyle = options.color;
    }

    ctx.fillText(finalText, xPos, yPos);
  }
}
