import AddIcon from '@mui/icons-material/Add';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import Link from 'next/link';

export default function InvoiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box
        component="nav"
        sx={{
          width: 240,
          flexShrink: 0,
          bgcolor: '#1C2536',
          color: 'white',
          p: 3,
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" component="div">
            InvoiceHub
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ mb: 2, color: 'grey.500' }}>
          MENU
        </Typography>

        <Link href="/invoices/add" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'grey.300',
              p: 1.5,
              mb: 1,
              borderRadius: 1,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
            }}
          >
            <AddIcon sx={{ mr: 2 }} />
            <Typography>Add Invoice</Typography>
          </Box>
        </Link>

        <Link href="/invoices/list" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'grey.300',
              p: 1.5,
              borderRadius: 1,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
            }}
          >
            <ReceiptOutlinedIcon sx={{ mr: 2 }} />
            <Typography>My Invoices</Typography>
          </Box>
        </Link>
      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: '#F8F9FA', minHeight: '100vh' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            p: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: 'white',
            gap: 2,
          }}
        >
          <IconButton>
            <DarkModeOutlinedIcon />
          </IconButton>
          <IconButton>
            <NotificationsNoneOutlinedIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Box sx={{ mr: 2, textAlign: 'right' }}>
              <Typography variant="body1">John Doe</Typography>
              <Typography variant="body2" color="text.secondary">
                Verified Member
              </Typography>
            </Box>
            <Avatar>JD</Avatar>
          </Box>
        </Box>

        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
