'use client'

import React, { useState, useCallback, useEffect } from 'react'
import styles from './poste-deal.module.css'
import { MdLink } from 'react-icons/md'

import { HandleUploadFile } from '@/lib/api/file'
import { toast } from 'react-hot-toast'
import {
  PostArticleData,
  UpdateArticleData,
  getArticleBySlug
} from '@/lib/api/article'
import { Category } from '@/interfaces/categorie'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSessionContext } from 'supertokens-auth-react/recipe/session'
import { UploadImage } from './UploadImage'
import { TextEditor } from '../text-editor/text-editor'
import { useTextEditor } from '../upload-image-modal/text-editor-context/text-editor-context'
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph'

export default function PostArticle({
  categories
}: {
  categories: Category[]
}) {
  const [images, setImages] = useState<File[] | any[]>([])
  const [imagesUrl, setImagesUrl] = useState<string[]>([])
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string | any>('')

  const [titleError, setTitleError] = useState<string>('')
  const [contentError, setContentError] = useState<string>('')
  const [categoryError, setCategoryError] = useState<string>('')

  const [articleId, setArticleId] = useState<string | any>(null)

  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [selectedFilePreviews, setSelectedFilePreviews] = useState<
    File[] | any
  >([])

  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)

  const [isEdited, setIsEdited] = useState(true)

  const [checkedCategories, setCheckedCategories] = useState<any[]>([])

  const [isDragging, setIsDragging] = useState(false)
  const [dragIndex, setDragIndex] = useState(-1)

  const searchParams = useSearchParams()
  const articleSlug = searchParams.get('edit')

  const { setTextEditorContent } = useTextEditor()

  useEffect(() => {
    if (articleSlug !== null) {
      GetArticleDetailBySlug(articleSlug)
      setContent(null)
    }
  }, [articleSlug])

  const GetArticleDetailBySlug = (articleSlug: string) => {
    setLoading(true)
    getArticleBySlug(articleSlug).then((result) => {
      if (result) {
        setArticleId(result.id)
        setTitle(result.title)
        const imagesUpdate: any = result.images
        const imagesLists: any[] = []
        const imagesUrlLists: any[] = []
        imagesUpdate.map((url: any) => {
          imagesLists.push({ url })
          imagesUrlLists.push(url)
          setImages(imagesLists)
          setImagesUrl(imagesUrlLists)
          setSelectedFilePreviews([{ url: url }])
        })
        const articleContent: any = JSON.parse(result.content)
        setTextEditorContent(articleContent)
        setCheckedCategories(result.categories)
        setLoading(false)
        setIsEdited(false)
      }
    })
  }

  //For drag/drop images

  const HandleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    if (isDragging === false) {
      const files = Array.from(event.dataTransfer.files)
      setIsDragging(false)
      const filePreviews = files.map((file) => URL.createObjectURL(file))
      setSelectedFilePreviews([...selectedFilePreviews, ...filePreviews])
      setImages([...images, ...files])
      HandleUploadedFiles(files, 'article_image')
    }
  }

  const HandleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
    },
    []
  )

  const router = useRouter()

  const StartDrag = (
    index: number | any,
    event: React.DragEvent<HTMLDivElement>
  ) => {
    setDragIndex(index)
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text', index)
  }

  const OnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    setIsDragging(true)
  }

  // On drag image list

  const OnDrop = (index: number, event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const movedImageIndex = event.dataTransfer.getData('text')
    setIsDragging(true)

    if (movedImageIndex !== '') {
      const fromIndex = parseInt(movedImageIndex)
      const toIndex = index

      // Rearrange the images array
      const movedImage = images[fromIndex]
      const updatedImages = [...images]
      updatedImages.splice(fromIndex, 1)
      updatedImages.splice(toIndex, 0, movedImage)

      const items: any[] = []
      updatedImages.forEach((img: any) => {
        items.push(img.url)
      })

      // Set the URL of image to imagesUrl
      setImagesUrl(items)

      setImages(updatedImages)
    }
    setDragIndex(-1)
  }

  // Desactive or active checkbox On checked or unchecked the category article

  const HandleCheckboxChange = (event: any) => {
    const value = event.target.value
    const isChecked = event.target.checked

    if (isChecked) {
      setCheckedCategories((prevCheckedItems) => [...prevCheckedItems, value])
      setCategoryError('')
    } else {
      // remove element if unchecked
      setCheckedCategories((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== value)
      )
    }
  }

  // On change input file on upluad image

  const HandleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files || null
    if (!files) return

    const fileList = Array.from(files)

    setSelectedFiles(fileList)

    const filePreviews = fileList.map((file) => URL.createObjectURL(file))
    setSelectedFilePreviews([...selectedFilePreviews, ...filePreviews])

    HandleUploadedFiles(fileList, 'article_image')
  }

  // Upload images with API

  const HandleUploadedFiles = (selectedFiles: any[], type: string) => {
    setLoading(true)
    const promises = selectedFiles.map((image: any) =>
      HandleUploadFile(image, type)
    )

    Promise.all(promises)
      .then((responses) => {
        if (responses.length === 0) {
          toast.error("Erreur lors de l'upload des images.")
          setSelectedFilePreviews([])
          setImages([])
        } else {
          setImages([...images, ...responses])
          const items: any[] = []

          const listsImgs = []
          listsImgs.push(...images, ...responses)

          listsImgs.forEach((img: any) => {
            items.push(img.url)
          })

          // Set the URL of image to imagesUrl
          setImagesUrl([...items])

          setLoading(false)
          toast.success('Upload image effectuer avec succès.')
        }
      })
      .catch((error) => {
        toast.error("Erreur lors de l'upload de l'image", error)
        setSelectedFilePreviews([])
        setImages([])
        setLoading(false)
      })
  }

  const FormValidation = () => {
    if (title === '' && content === '' && checkedCategories.length === 0) {
      setTitleError('Champs titre obligatoire')
      setContentError('Champs contenu obligatoire')
      setCategoryError('Selectionner au moins 1 categorie')
      setLoading1(false)
    }
    if (title === '') {
      setTitleError('Champs titre obligatoire')
      setLoading1(false)
    } else if (content === '') {
      setContentError('Champs contenu obligatoire')
      setLoading1(false)
    } else if (checkedCategories.length === 0) {
      setCategoryError('Selectionner au moins 1 categorie')
      setLoading1(false)
    }
  }

  // Post or Update article on click button

  const UpdatedArticle = (e: any) => {
    setLoading1(true)
    e.preventDefault()
    FormValidation()
    const articleContent = JSON.stringify(content)
    if (title !== '' && content !== '' && checkedCategories.length !== 0) {
      const res = UpdateArticleData(
        title,
        imagesUrl,
        checkedCategories,
        articleContent,
        articleId
      )
      res.then((res: any) => {
        if (res.ok === true) {
          setLoading1(false)
          setSelectedFilePreviews([])
          setCheckedCategories([])
          setTitle('')
          setContent('')
          setImages([])
          setImagesUrl([])
          setSelectedFiles([])
          router.push('/')
        } else {
          toast.error("Erreur lors de la mise a jour de l'article")
        }
      })
    }
  }

  const PostedArticle = (e: any) => {
    setLoading1(true)
    e.preventDefault()
    FormValidation()
    const articleContent = JSON.stringify(content)
    if (title !== '' && content !== '' && checkedCategories.length !== 0) {
      const res = PostArticleData(
        title,
        imagesUrl,
        checkedCategories,
        articleContent
      )
      res.then((res: any) => {
        if (res.ok === true) {
          setLoading1(false)
          setSelectedFilePreviews([])
          setCheckedCategories([])
          setTitle('')
          setContent('')
          setImages([])
          setImagesUrl([])
          setSelectedFiles([])
        } else {
          toast.error("Erreur lors de la post de l'article")
        }
      })
    }
  }

  // Validate action Post or Update article

  const ValidateAction = (e: any) => {
    e.preventDefault()
    if (articleSlug !== null) {
      UpdatedArticle(e)
    } else {
      PostedArticle(e)
    }
  }

  // Remove image from list
  const RemoveImageOnList = (e: Event, index: number) => {
    e.preventDefault()

    const newImgs = images.filter(
      (imgId: string, imgIndex: number) => imgIndex !== index
    )

    const newImageUrl = newImgs.map((img) => img.url)

    setImagesUrl(newImageUrl)
    setImages(newImgs)
    setSelectedFilePreviews(newImgs)
    if (selectedFilePreviews.length === 0) {
      setSelectedFilePreviews([])
    }
  }

  const OnBlurTitle = () => {
    if (title === '') {
      setTitleError('Champs titre est obligatoire')
    } else {
      setTitleError('')
    }
  }

  const OnBlurContent = () => {
    if (content === '') {
      setContentError('Champs content est obligatoire')
    } else {
      setContentError('')
    }
  }

  return (
    <div
      className={`max-w-[2520px] w-full xl:flex 2xl:px-60 xl:px-32 md:24 px-6 gap-3 xl:pt-[70px] p3.5-6`}
    >
      <div className={`w-full p-6 ${styles.bg}`}>
        <div className="pb-6">
          <h3 className="text-2xl">Poster de nouveau article</h3>
        </div>
        <hr className={`${styles.separator}`} />

        <div className="py-6 w-full">
          <UploadImage
            selectedFilePreviews={selectedFilePreviews}
            loading={loading}
            images={images}
            HandleFileChange={HandleFileChange}
            RemoveImageOnList={RemoveImageOnList}
            HandleDrop={HandleDrop}
            HandleDragOver={HandleDragOver}
            StartDrag={StartDrag}
            OnDragOver={OnDragOver}
            OnDrop={OnDrop}
          />

          <div className="block w-full pb-6">
            <p className="mb-2 font-bold">Titre</p>
            <div className="relative">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={OnBlurTitle}
                type="titre"
                id="default-search"
                className={`${
                  titleError !== '' ? 'border-red-600' : 'border-gray200'
                } w-full px-6 py-3 border-[1px] border-neutral-200 rounded-full hover:shadow-md transition`}
                placeholder="Titre"
              />
            </div>
            <span className="text-red-500 py-3">{titleError}</span>
          </div>

          <div className="block w-full pb-10">
            <p className="mb-2 font-bold">Description</p>
            <div className={`w-full border-2 ${styles.redactor_content}`}>
              <TextEditor
                setContent={setContent}
                isEdited={isEdited}
                content={content}
              />
            </div>
            <span className="text-red-500 py-3">{contentError}</span>
          </div>

          <hr className={`${styles.separator}`} />

          <div className="block w-full mt-6 mb-6">
            <h5 className="pb-3 text-xl font-bold">Détails</h5>
            <p className="text-md font-bold">Catégories</p>
            <p className="text-sm">
              Quelle est la catégorie principale de votre article ?
            </p>
            <div className="lg:grid grid-cols-6 grid-rows-10 gap-4 py-6">
              {categories &&
                categories.map((item: any) => (
                  <div key={item.id} className="flex mt-3 lg:mt-0 w-full">
                    <input
                      value={item.id}
                      checked={checkedCategories.includes(item.id)}
                      onChange={HandleCheckboxChange}
                      type="checkbox"
                      id={item.id}
                      className="peer hidden"
                    />
                    <label
                      htmlFor={item.id}
                      className="w-full text-center select-none cursor-pointer rounded-lg border-2 border-gray-200
                                    py-3 px-6 font-bold text-gray-400 transition-colors duration-200 ease-in-out peer-checked:bg-[#e26400] peer-checked:text-gray-900 peer-checked:border-gray-200 "
                    >
                      {' '}
                      {item.title}{' '}
                    </label>
                  </div>
                ))}
            </div>
            <span className="text-red-500 py-3">{categoryError}</span>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={(e) => ValidateAction(e)}
            className={`px-3 py-2 font-bold text-md ${styles.btn_post}`}
          >
            {loading1 ? <>Chargement...</> : <>Publier l'article</>}
          </button>
        </div>
      </div>
    </div>
  )
}
