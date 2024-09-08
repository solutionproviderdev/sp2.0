{/* MUI Sidebar (Drawer) */}
<Drawer
variant="permanent" // Use 'permanent' for a fixed sidebar
sx={{
    width: drawerWidth,
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
}}
>
<Toolbar />
<Box sx={{ overflow: 'auto' }}>
    <List>
        <ListItem button>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
            <ListItemText primary="Leads" />
        </ListItem>
        <ListItem button>
            <ListItemText primary="Contacts" />
        </ListItem>
        <ListItem button>
            <ListItemText primary="Settings" />
        </ListItem>
    </List>
    <Divider />
    <List>
        <ListItem button>
            <ListItemText primary="Logout" />
        </ListItem>
    </List>
</Box>
</Drawer>
