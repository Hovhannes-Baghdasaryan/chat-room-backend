import { extname } from 'path'
import { ForbiddenException } from '@nestjs/common'

// 10 mb
export const fileSize = 10485760

export const fileFilter = (req, file, callback) => {
  const allowedExtensions = ['.png', '.jpeg', '.jpg', '.jfif']

  const fileExtName = extname(file.originalname).toLowerCase()

  if (!allowedExtensions.includes(fileExtName)) {
    return callback(
      new ForbiddenException(
        `File format should be one of these formats ${allowedExtensions.join(', ')}`
      ),
      false
    )
  }

  callback(null, true)
}

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0]
  const fileExtName = extname(file.originalname)
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('')
  callback(null, `${name}-${randomName}${fileExtName}`)
}
