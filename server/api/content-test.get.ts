export default defineEventHandler(async (event) => {
  try {
    // Try to get content using server-side query
    const content = await queryContent().find()
    return {
      success: true,
      count: content.length,
      items: content.map(item => ({
        path: item._path,
        title: item.title,
        type: item._type
      }))
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}) 