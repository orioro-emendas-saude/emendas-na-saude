import React from 'react'

import styled, { ThemeProvider } from 'styled-components'

import { createHashRouter, RouterProvider } from 'react-router-dom'

import { Mapa } from '../../routes/mapa'

import { Root } from '../../routes/root'
import {
  Container,
  DialogSystem,
  InputProvider,
  INPUTS,
  OutputProvider,
  OUTPUTS,
  theme,
} from '@orioro/react-ui-core'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import { DataProvider } from '../DataContext'

const AppContainer = styled.main`
  font-family: sans-serif;

  * {
    box-sizing: border-box;
  }
`

export function App() {
  return (
    <ThemeProvider theme={theme()}>
      <Theme accentColor="sky">
        <OutputProvider renderers={OUTPUTS} variant="labeled">
          <InputProvider renderers={INPUTS} variant="labeled">
            <DialogSystem>
              <DataProvider>
                <AppContainer>
                  <Container
                    maxWidth={1200}
                    // style={{
                    //   background: 'green',
                    // }}
                  >
                    <RouterProvider
                      router={createHashRouter([
                        {
                          path: '/',
                          element: <Root />,
                          children: [
                            {
                              index: true,
                              element: <Mapa />,
                            },
                            {
                              path: 'mapa/:indicatorId/:geoType/:geoId',
                              element: <Mapa />,
                            },
                          ],
                        },
                      ])}
                    />
                  </Container>
                </AppContainer>
              </DataProvider>
            </DialogSystem>
          </InputProvider>
        </OutputProvider>
      </Theme>
    </ThemeProvider>
  )
}
