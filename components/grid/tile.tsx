import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <>
      <div
        className={clsx(
          'flex  h-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black',
          {
            relative: label,
            'border-2 border-blue-600': active,
            'border-neutral-200 dark:border-neutral-800': !active
          }
        )}
      >
        {props.src ? (
          // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
          <div className="relative aspect-[2/3] h-full w-full">
            <Image
              className={clsx('relative  h-full w-full object-contain', {
                'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
              })}
              {...props}
            />
          </div>
        ) : null}
      </div>
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </>
  );
}
