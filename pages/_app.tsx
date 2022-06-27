import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, Theme, ThemeProvider } from '@mui/material'
import { customTheme, darkTheme } from '../themes';
import { lightTheme } from '../themes/light-theme';
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import { NextPage } from 'next';

interface Props extends AppProps {
  theme: string
}

function MyApp({ Component, pageProps, theme = 'dark' }: Props) {

  const [currentTheme, setCurrentTheme] = useState(lightTheme)

  useEffect(() => {
    const cookieTheme = Cookies.get('theme') || 'light'

    const selectedTheme:Theme = cookieTheme === 'light'
      ? lightTheme
      : theme === 'dark'
      ? darkTheme
      : customTheme
    setCurrentTheme(selectedTheme)
  }, [theme])


  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

MyApp.getInitialProps = async (appContext: any) => {

  const {theme} = appContext.ctx.req ? (appContext.ctx.req as any).cookies : {theme: 'light'}
  const validThemes = ['light', 'dark', 'custom']

  return {
    theme: validThemes.includes(theme) ? theme : 'light'
  }
}

export default MyApp
