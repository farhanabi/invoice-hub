'use client';

import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DRAWER_WIDTH = 240;

const NavLink = ({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: typeof AddIcon;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: isActive ? 'white' : 'grey.300',
          p: 1.5,
          mb: 1,
          borderRadius: 1,
          bgcolor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
        }}
      >
        <Icon sx={{ mr: 2 }} />
        <Typography>{children}</Typography>
      </Box>
    </Link>
  );
};

export default function InvoiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Typography variant="h6" component="div">
          InvoiceHub
        </Typography>
        {isMobile && (
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ ml: 'auto', color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Typography variant="body2" sx={{ mb: 2, color: 'grey.500' }}>
        MENU
      </Typography>

      <NavLink href="/invoices/add" icon={AddIcon}>
        Add Invoice
      </NavLink>

      <NavLink href="/invoices/list" icon={ReceiptOutlinedIcon}>
        My Invoices
      </NavLink>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Desktop Drawer */}
      {!isMobile && (
        <Box
          component="nav"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            bgcolor: '#1C2536',
            color: 'white',
          }}
        >
          {drawer}
        </Box>
      )}

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            bgcolor: '#1C2536',
            color: 'white',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#F8F9FA',
          minHeight: '100vh',
          width: { xs: '100%', md: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: 'white',
          }}
        >
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box
            sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}
          >
            <IconButton>
              <DarkModeOutlinedIcon />
            </IconButton>
            <IconButton>
              <NotificationsNoneOutlinedIcon />
            </IconButton>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                ml: 2,
                '& .user-info': {
                  display: { xs: 'none', sm: 'block' },
                },
              }}
            >
              <Box sx={{ mr: 2, textAlign: 'right' }} className="user-info">
                <Typography variant="body1">John Doe</Typography>
                <Typography variant="body2" color="text.secondary">
                  Verified Member
                </Typography>
              </Box>
              <Avatar>JD</Avatar>
            </Box>
          </Box>
        </Box>

        <Box sx={{ p: { xs: 2, sm: 3 } }}>{children}</Box>
      </Box>
    </Box>
  );
}
