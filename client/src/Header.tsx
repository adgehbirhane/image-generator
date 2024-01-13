import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'

export default function Header() {
  return (
    <AppBar sx={{position: 'static'}}>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography>Adgeh Image Generator</Typography>
            <Typography>Dev links</Typography>
        </Toolbar>
    </AppBar>
  )
}
