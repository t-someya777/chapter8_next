export const formatDate = (createdAt:Date) => {
  const date = new Date(createdAt)
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}

export const time = (datetime:Date) => {
  const date = new Date(datetime)
  return date.toJSON().split('T')[0];
}