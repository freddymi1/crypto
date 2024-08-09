import { toast } from 'react-hot-toast'

export const HandleUploadFile = async (selectedFiles: File, type: string) => {
  if (selectedFiles.length === 0) return

  try {
    const formData = new FormData()
    formData.append(`file`, selectedFiles)

    formData.append('usage_type', type)

    const responses = await fetch(`${process.env.API_URL}/files`, {
      method: 'POST',
      body: formData
    })

    const result = await responses.json()

    return result
  } catch (error) {
    toast.error("Erreur lors de l'upload des images")
  }
}
