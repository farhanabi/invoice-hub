'use client';

import { useState } from 'react';
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
  Switch,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Passion_One } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DRAWER_WIDTH = 240;

const NavLink = ({
  href,
  iconSrc,
  children,
}: {
  href: string;
  iconSrc: string;
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
          color: isActive ? '#F4F4F4' : '#9D9D9D',
          py: 1,
          mb: 1,
          borderRadius: 1,
          transition: 'color 0.2s ease-in-out',
          '&:hover': {
            color: '#F4F4F4',
            '& img': {
              filter: 'brightness(0) invert(1)',
            },
          },
        }}
      >
        <Box
          sx={{
            mr: 2,
            width: 18,
            height: 18,
            position: 'relative',
            '& img': {
              filter: isActive ? 'brightness(0) invert(1)' : 'brightness(0.6)',
              transition: 'filter 0.2s ease-in-out',
            },
          }}
        >
          <Image
            src={iconSrc}
            alt=""
            fill
            style={{
              objectFit: 'contain',
            }}
          />
        </Box>
        <Typography>{children}</Typography>
      </Box>
    </Link>
  );
};

const passionOne = Passion_One({
  weight: ['700'],
  subsets: ['latin'],
});

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Image src="/logomark.svg" alt="logo" width={30} height={30} />
          <Typography
            variant="h6"
            component="div"
            className={passionOne.className}
            sx={{
              fontSize: '1.5rem',
              letterSpacing: '0.02em',
              fontFamily: 'Passion One, cursive',
            }}
          >
            InvoiceHub
          </Typography>
        </Box>
        {isMobile && (
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ ml: 'auto', color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Typography variant="body2" sx={{ mb: 1, color: 'grey.500' }}>
        MENU
      </Typography>

      <NavLink href="/invoices/add" iconSrc="/capital-letter.svg">
        Add Invoice
      </NavLink>

      <NavLink href="/invoices/list" iconSrc="/bullet-points.svg">
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
          keepMounted: true,
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
            justifyContent: 'justify-between',
            gap: 2,
            p: 2,
            bgcolor: 'white',
            borderBottom: '1px solid',
            borderColor: 'divider',
            width: '100%',
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
            sx={{
              display: 'flex',
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 4,
            }}
          >
            {!isMobile && (
              <>
                {/* Dark Mode Switch */}
                <Switch
                  // checked={isDarkMode}
                  // onChange={(e) => setIsDarkMode(e.target.checked)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#2196f3',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#2196f3',
                    },
                  }}
                />

                <Box sx={{ display: 'flex', gap: 2 }}>
                  {/* Notification Bell */}
                  <Box>
                    <IconButton
                      sx={{
                        cursor: 'pointer',
                        background: '#EFF4FB',
                        borderRadius: '100%',
                        border: '0.5px solid #E2E8F0',
                      }}
                    >
                      <Image
                        src="/icons/alarm.svg"
                        alt=""
                        width={18}
                        height={18}
                      />
                    </IconButton>
                  </Box>
                  {/* Messages Icon */}
                  <Box sx={{ position: 'relative' }}>
                    <IconButton
                      sx={{
                        cursor: 'pointer',
                        background: '#EFF4FB',
                        borderRadius: '100%',
                        border: '0.5px solid #E2E8F0',
                      }}
                    >
                      <Image
                        src="/icons/chat.svg"
                        alt=""
                        width={18}
                        height={18}
                      />
                    </IconButton>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 10,
                        height: 10,
                        bgcolor: 'error.main',
                        borderRadius: '50%',
                        border: '2px solid #fff',
                      }}
                    />
                  </Box>
                </Box>
              </>
            )}

            {/* User Info */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                cursor: 'pointer',
              }}
            >
              <Box sx={{ textAlign: 'right' }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, color: '#1C2536' }}
                >
                  John Doe
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Verified Member
                </Typography>
              </Box>
              <Avatar sx={{ width: 40, height: 40 }} src="/images/john-doe.png">
                JD
              </Avatar>
              <KeyboardArrowDownIcon sx={{ fontSize: 20, color: '#666' }} />
            </Box>
          </Box>
        </Box>

        <Box sx={{ p: { xs: 2, sm: 3 } }}>{children}</Box>
      </Box>
    </Box>
  );
}
