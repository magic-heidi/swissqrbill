/**
 * Colors used to render a Swiss QR code.
 *
 * All properties are optional. Unspecified colors use the standard black and
 * white Swiss QR code appearance.
 */
export class QRTheme {

  /**
   * Color of the QR code modules.
   *
   * @default `"black"`
   */
  public moduleColor?: string;

  /** Colors of the Swiss cross in the center of the QR code. */
  public cross?: {

    /**
     * Color of the cross's outer border.
     *
     * @default `"white"`
     */
    borderColor?: string;

    /**
     * Color behind the cross.
     *
     * @default `"black"`
     */
    bgColor?: string;

    /**
     * Color of the cross itself.
     *
     * @default `"white"`
     */
    fillColor?: string;
  };

  /**
   * Resolves a partial theme to the colors used by the QR code renderers.
   *
   * @param theme Partial theme to resolve.
   * @returns Resolved theme.
   */
  public static resolve(theme?: QRTheme) {
    return {
      cross: {
        bgColor: theme?.cross?.bgColor ?? "black",
        borderColor: theme?.cross?.borderColor ?? "white",
        fillColor: theme?.cross?.fillColor ?? "white"
      },
      moduleColor: theme?.moduleColor ?? "black"
    };
  }
}
