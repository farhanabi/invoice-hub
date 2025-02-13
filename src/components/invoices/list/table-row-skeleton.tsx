import { TableRow, TableCell, Box, Skeleton } from '@mui/material';

export const TableRowSkeleton = () => (
  <TableRow>
    <TableCell>
      <Box>
        <Skeleton variant="text" width={200} sx={{ mb: 1 }} />
        <Skeleton variant="text" width={120} />
      </Box>
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={100} />
    </TableCell>
    <TableCell>
      <Skeleton variant="rounded" width={80} height={32} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={120} />
    </TableCell>
    <TableCell align="right">
      <Skeleton variant="circular" width={40} height={40} />
    </TableCell>
  </TableRow>
);
