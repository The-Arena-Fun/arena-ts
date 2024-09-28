type PriceDirectionProps = {
  size: number;
  priceDirection: 'up' | 'down'
  color?: string;
}

export function PriceDirection(props: PriceDirectionProps) {
  const { size, priceDirection, color } = props;
  const rotationClass = priceDirection === 'up' ? '' : 'transform rotate-180'
  return (
    <svg width={size} height={size} viewBox="0 0 9 9" className={`${rotationClass}`}>
      <path fillRule="evenodd" clipRule="evenodd"
        d="M4.15601 4.42847L1.10401 7.48047C0.950005 7.63447 0.880005 7.80247 0.880005 7.99847C0.880005 8.40447 1.216 8.78247 1.63601 8.78247C1.83201 8.78247 2.01401 8.71247 2.15401 8.57247L4.36601 6.36047C4.46401 6.26247 4.59001 6.20647 4.70201 6.20647C4.82801 6.20647 4.94001 6.27647 5.05201 6.37447L7.22201 8.54447C7.36201 8.69847 7.54401 8.75447 7.75401 8.75447C8.18801 8.75447 8.51001 8.44647 8.51001 8.01247C8.51001 7.80247 8.44001 7.62047 8.28601 7.46647L5.24801 4.42847C5.09401 4.27447 4.91201 4.20447 4.70201 4.20447C4.49201 4.20447 4.29601 4.28847 4.15601 4.42847ZM4.15601 0.441408L1.10401 3.49341C0.950012 3.64741 0.880012 3.81541 0.880012 4.01141C0.880012 4.41741 1.21601 4.79541 1.63601 4.79541C1.83201 4.79541 2.01401 4.72541 2.15401 4.58541L4.36601 2.37341C4.46401 2.27541 4.59001 2.21941 4.70201 2.21941C4.82801 2.21941 4.94001 2.28941 5.05201 2.38741L7.22201 4.55741C7.36201 4.71141 7.54401 4.76741 7.75401 4.76741C8.18801 4.76741 8.51001 4.45941 8.51001 4.02541C8.51001 3.81541 8.44001 3.63341 8.28601 3.47941L5.24801 0.441408C5.09401 0.287408 4.91201 0.217408 4.70201 0.217408C4.49201 0.217408 4.29601 0.301408 4.15601 0.441408Z"
        fill={color ?? PRICE_DIRECTION_COLOR[priceDirection]} />
    </svg>
  )
}

export const PRICE_DIRECTION_COLOR: Record<PriceDirectionProps['priceDirection'], string> = {
  up: '#39F37B',
  down: '#FF4E7A'
}