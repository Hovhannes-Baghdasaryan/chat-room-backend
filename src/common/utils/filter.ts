import { extname } from 'path'

export const fileFilter = (req, file, callback) => {
  const allowedExtensions = ['.png', '.jpeg', '.webp', '.jpg']

  const fileExtName = extname(file.originalname).toLowerCase()

  if (!allowedExtensions.includes(fileExtName)) {
    return callback(new Error('Only few file formats are allowed!'), false)
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
