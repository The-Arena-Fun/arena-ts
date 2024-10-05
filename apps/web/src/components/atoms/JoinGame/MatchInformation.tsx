import { useMatchDefaultConfig } from "@/hooks/match/useMatchDefaultConfig";
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
  const matchConfigQuery = useMatchDefaultConfig();
  return (
    <MatchInformation
      betAmount={matchConfigQuery.data?.individual_wage_amount ?? 10}
      tradingAmount={matchConfigQuery.data?.individual_trade_amount ?? 50} />
  )
}