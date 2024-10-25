// src/lib/utils/middlewares.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function corsMiddleware(): NextResponse {
  const response = NextResponse.next()
  // We want to modify the response before moving it forward
  // Create response, modify it, then return it
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  return response
}

export function authMiddleware(request: NextRequest): NextResponse {
  const token = request.headers.get('authorization')
  
  if (!token) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  
  return NextResponse.next()
}
