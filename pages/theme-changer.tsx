import { GetServerSideProps } from 'next'
import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { Layout } from '../components/layouts'
import Cookies from 'js-cookie'
import axios from 'axios'

interface Props {
  theme: string
}

const ThemeChangerPage:FC<Props> = ({theme}) => {

  const [currentTheme, setCurrentTheme] = useState(theme)

  const onThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = event.target.value
    setCurrentTheme(selectedTheme)
    Cookies.set('theme', selectedTheme)

  }

  const onClick = async () => {
    const {data} = await axios.get('/api/hello')
  }

  useEffect(() => {
    
  }, [])

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Tema</FormLabel>
            <RadioGroup
              value={currentTheme}
              onChange={onThemeChange}
            >
              <FormControlLabel value='light' control={<Radio />} label='Light' />
              <FormControlLabel value='dark' control={<Radio />} label='Dark' />
              <FormControlLabel value='custom' control={<Radio />} label='Custom' />
            </RadioGroup>
          </FormControl>
          <Button
            onClick={onClick}
          >Solicitud</Button>
        </CardContent>
      </Card>
    </Layout>
  )
}

export default ThemeChangerPage

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({req}) => {

  const {theme = 'light', name = 'No name'} = req.cookies

  const validTheme = ['light', 'dark', 'custom']

  return {
    props: {
      theme: validTheme.includes(theme) ? theme : 'light',
      name
    }
  }
}