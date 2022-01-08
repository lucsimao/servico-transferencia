export class AmountHelper {
  public static roundToTwoDecimalPlaces(number: number) {
    const places = 2;
    return +(Math.round(+(number + 'e+' + places)) + 'e-' + places);
  }
}
