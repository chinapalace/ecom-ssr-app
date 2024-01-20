import clsx from 'clsx';

function Grid(props: React.ComponentProps<'ul'>) {
  return (
    <ul {...props} className={clsx('grid grid-flow-row gap-4', props.className)}>
      {props.children}
    </ul>
  );
}

function GridItem(props: React.ComponentProps<'li'>) {
  return (
    <li {...props} className={clsx(' transition-opacity', props.className)}>
      {props.children}
    </li>
  );
}

Grid.Item = GridItem;

export default Grid;

// import clsx from 'clsx';

// function Grid(props: React.ComponentProps<'ul'>) {
//   return (
//     <ul
//       {...props}
//       className={clsx('grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3', props.className)}
//     >
//       {props.children}
//     </ul>
//   );
// }

// function GridItem(props: React.ComponentProps<'li'>) {
//   return (
//     <li {...props} className={clsx('flex flex-col', props.className)}>
//       {props.children}
//     </li>
//   );
// }

// Grid.Item = GridItem;

// export default Grid;
