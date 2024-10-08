'use client';

type InfoItemProps = {
  heading: string;
  description: string
}

export function TopPerformerCardInfoItem(props: InfoItemProps) {
  const { heading, description } = props;
  return (
    <div className="flex flex-col items-start">
      <p className="text-xs text-gray-500">{heading}</p>
      <p className="text-base text-white">{description}</p>
    </div>
  )
}