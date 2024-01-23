import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode,
  position = 'bottom'
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: 'bottom' | 'center';
}) => {
  return (
    <div
    // className={clsx('absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label', {
    //   'lg:px-20 lg:pb-[35%]': position === 'center'
    // })}
    // className="flex h-12 items-center justify-center bg-gray-200"
    >
      <div className=" flex flex-col bg-primary pt-2 font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
        <Price
          className="text-sm text-black dark:text-white"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
        <h3 className="mr-4 line-clamp-2 flex-grow text-xs leading-none tracking-tight text-secondary">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default Label;
