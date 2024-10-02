import React, { useRef } from 'react'

import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

import { createHashRouter, RouterProvider } from 'react-router-dom'

import { Index } from '../../routes/index'
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
  const printComponentRef = useRef(null)

  return (
    <ThemeProvider theme={theme()}>
      <AppContainer ref={printComponentRef}>
        <Theme accentColor="green">
          <OutputProvider renderers={OUTPUTS} variant="labeled">
            <InputProvider renderers={INPUTS} variant="labeled">
              <DialogSystem>
                <DataProvider>
                  <Container maxWidth={1200}>
                    <RouterProvider
                      router={createHashRouter([
                        {
                          path: '/',
                          element: <Root />,
                          children: [
                            {
                              index: true,
                              element: <Index />,
                            },

                            // {
                            //   path: 'mapa/todos/:geoType/:geoId',
                            //   element: <div>test</div>,
                            // },

                            {
                              path: 'mapa/:indicatorId/:geoType/:geoId',
                              element: (
                                <Mapa printComponentRef={printComponentRef} />
                              ),
                            },
                          ],
                        },
                      ])}
                    />
                  </Container>
                </DataProvider>
              </DialogSystem>
            </InputProvider>
          </OutputProvider>
        </Theme>
      </AppContainer>
    </ThemeProvider>
  )
}
