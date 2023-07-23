import { afterAll, afterEach, beforeAll, expect } from 'vitest'
import { setupServer } from 'msw/node'
import { authRequests } from './src/msw/auth.msw'
import { productsRequests } from './src/msw/product.msw'
import { meRequests } from './src/msw/user.msw'
import matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

const server = setupServer(...authRequests, ...productsRequests, ...meRequests)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
