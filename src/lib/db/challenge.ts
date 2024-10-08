import prisma from '@/lib/db/prisma'

export const getCurrentChallenge = () =>
  prisma.challenge.findFirst({
    where: {
      tagger: null,
      invalidated: false,
      taggedAt: null,
      createdAt: {
        gte: new Date(Date.now() - 1000 * 60 * 10),
      },
    },
    orderBy: {
      id: 'desc',
    },
    include: {
      tagged: true,
      tagger: true,
    },
  })
