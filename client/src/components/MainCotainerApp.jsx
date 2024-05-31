import React, { useState } from 'react'
import { useAuthStore } from '../stores'
import { Box, CssBaseline, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import { MdMenu } from 'react-icons/md'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import MenuSimple from './MenuSimple'
import { styled } from '@mui/material/styles'
import { DynamicIcon } from './DynamicIcon'

const drawerWidth = 240

export const MainCotainerApp = ({ children }) => {
  const user = useAuthStore(state => state.user)
  const setCredentialsLogout = useAuthStore(state => state.setCredentialsLogout)
  const [open, setOpen] = useState(false)
  const { first_name, last_name, groups } = user
  const { permissions } = groups ? groups[0] : []
  const viewPermissions = permissions.filter(permission => permission.codename.startsWith('view_'))
  const modules = [...new Set(viewPermissions.map(permission => permission.content_type))]

  const [selectedItem, setSelectedItem] = useState(null)
  const navigate = useNavigate()

  const handleItemClick = (index) => {
    setSelectedItem(index)
  }

  const logoutUser = () => {
    setCredentialsLogout()
    navigate('/')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 10 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen((prev) => !prev)}
            edge="start"
            sx={{ marginRight: 5 }}
          >
            <MdMenu />
          </IconButton>
          <Link to={'/home'}>
            <Typography variant="h6" noWrap component="div">
              Seguimiento y control de boletas de pago
            </Typography>
          </Link>
          <div style={{ flex: 1 }} />
          <div className="flex flex-row gap-x-3 items-center">
            <div>
              <p className="font-semi-bold text-white text-sm">
                {`${first_name ?? 'Nombre'} ${last_name ?? 'Apellido'}`}
              </p>
              <p className="text-xs text-[gray]">{groups ? groups[0].name : 'Si rol asignado'}</p>
            </div>
            <div>
              <MenuSimple logoutUser={logoutUser} />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{ zIndex: 9 }}>
        <List
          sx={{
            marginTop: 8,
            flex: 1,
            backgroundColor: '#00510B',
            color: 'whitesmoke'
          }}
        >
          {modules.map((module, index) => (
            <NavLink to={module.model} key={module.model}>
              <ListItem
                disablePadding
                sx={{
                  display: 'block',
                  backgroundColor:
                    selectedItem === index ? '#599d52' : 'transparent'
                }}
              >
                <ListItemButton
                  selected={selectedItem === index}
                  onClick={() => {
                    handleItemClick(index)
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    '&:hover': {
                      backgroundColor: '#599d52'
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                      mr: open ? 2 : 'auto',
                      color: selectedItem === index ? '#00510B' : 'inherit'
                    }}
                  >
                    <DynamicIcon iconName={module.model} />
                  </ListItemIcon>
                  <ListItemText
                    primary={module.name}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: selectedItem === index ? '#00510B' : 'inherit'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, paddingX: 3, marginTop: 11, paddingBottom: 5 }}
      >
        {children}
      </Box>
    </Box>
  )
}

/** Style component */
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  backgroundColor: 'black',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  backgroundColor: '#00510B',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    backgroundColor: '#00510B',
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}))
