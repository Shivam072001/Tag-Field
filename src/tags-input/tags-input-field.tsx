import * as React from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { Tag } from 'react-tag-input'
import { createTags, TagsInput } from 'tags-input'

interface TagsInputFieldProps {
  name: string
  allowDuplicates?: boolean
  suggestions?: string[]
}

export function TagsInputField({
  name,
  allowDuplicates = false,
  suggestions = [],
}: TagsInputFieldProps) {
  const context = useFormContext()
  if (!context) {
    throw new Error('❌ `TagsInputField` must be used within a `FormProvider`')
  }
  const { control } = context
  const { field } = useController({
    name,
    control,
  })

  const tags = React.useRef(createTags(field.value))
  const [input, setInput] = React.useState('')

  const handleTagsChange = (newTags: Tag[]) => {
    field.onChange(newTags.map(tag => tag.id))
    tags.current = newTags
  }

  const handleInputChange = (input: string) => {
    setInput(input)

    // When input is empty or there are more tags than in the form field, update
    // the form field to match the tags.
    if (input === '' || tags.current.length > field.value.length) {
      field.onChange(tags.current.map(tag => tag.id))

      // When starting typing, the input value is not yet in the field value, so append it
      // to the end.
    } else if (field.value.length === tags.current.length) {
      field.onChange([...field.value, input])

      // Replace the last input value with the new one.
    } else if (field.value.length > tags.current.length) {
      field.onChange([...field.value.slice(0, -1), input])
    }
  }

  // If `allowDuplicates=false` remove duplicates from the field value.
  React.useEffect(() => {
    if (allowDuplicates) {
      return
    }
    const uniqueTags = Array.from<string>(new Set(field.value))
    if (field.value.length !== uniqueTags.length) {
      field.onChange(uniqueTags)
    }
  }, [allowDuplicates, field])

  return (
    <TagsInput
      inputValue={input}
      tags={tags.current}
      onInputChange={handleInputChange}
      onTagsChange={handleTagsChange}
      allowDuplicates={allowDuplicates}
      suggestions={suggestions}
    />
  )
}
