import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  src,
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
  src?: string;
} & React.ComponentProps<typeof Image>) {
  // const blurHash = await dynamicBlurDataUrl(src);

  return (
    <>
      <div
        className={clsx(
          ' group flex aspect-[2/3] h-full w-full items-center justify-center overflow-hidden rounded bg-neutral-200 hover:border-blue-600 dark:bg-neutral-800',
          {
            relative: label,
            'border-2 border-blue-600': active,
            'border-neutral-200 dark:border-neutral-800': !active
          }
        )}
      >
        {src ? (
          // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
          <Image
            className={clsx('relative h-full w-full object-cover ', {
              'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
            })}
            src={src}
            {...props}
            // placeholder="blur"
            // blurDataURL={blurHash}
          />
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
