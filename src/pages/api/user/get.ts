import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/db/prisma'

type ResponseData = {
  error?: 'MALFORMED_DATA' | 'INCORRECT_METHOD' | 'RESOURCE_DNE'
  data?: {
    id: number
    badgeCode: string
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') return res.status(400).json({ error: 'INCORRECT_METHOD' })

  const userId: number = req.body.userId

  if (!userId) return res.status(400).json({ error: 'MALFORMED_DATA' })

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) return res.status(400).json({ error: 'RESOURCE_DNE' })

  res.status(200).json({
    data: {
      id: user.id,
      badgeCode: user.badgeCode,
    },
  })
}
