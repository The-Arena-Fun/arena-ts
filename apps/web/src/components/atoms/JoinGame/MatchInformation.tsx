import { InfoItem, InfoItemSeperator } from "./InfoItem";

type MatchInformationProps = {
  betAmount: number
  tradingAmount: number
}

export function MatchInformation(props: MatchInformationProps) {
  const { betAmount, tradingAmount } = props;
  return (
    <div className="flex flex-1 flex-row justify-between items-center px-2">
      <InfoItem heading="Wager" description={`$${betAmount}`} />
      <InfoItemSeperator />
      <InfoItem heading="Trading" description={`$${tradingAmount}`} />
      <InfoItemSeperator />
      <InfoItem heading="Mode" description="2x PnL" />
      <InfoItemSeperator />
      <InfoItem heading="Time limit" description="24 hrs" />
    </div>
  )
}

export function MVPMatchInformation() {
  return <MatchInformation betAmount={10} tradingAmount={50} />
}