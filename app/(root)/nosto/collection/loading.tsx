import Grid from 'components/grid';

export default function Loading() {
  return (
    <Grid className="grid-cols-2 lg:grid-cols-3">
      {Array(12)
        .fill(0)
        .map((_, index) => {
          return (
            <Grid.Item
              key={index}
              className="aspect-[2/3] animate-pulse bg-neutral-100 dark:bg-neutral-900"
            />
          );
        })}
    </Grid>
  );
}
