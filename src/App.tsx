import * as React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { createTags, TagsInput } from 'tags-input'
import { TagsInputField } from 'tags-input/tags-input-field'
import CodeViewer from 'tags-input/CodeIcon'

import COUNTRIES from './countries.json'

const DEFAULT_TAGS = ['Mexico', 'Canada', 'United States']

const App = () => {
  return (
    <main className="app mt-12 px-5 space-y-8">
      <div className="prose">
        <h1>React Tags Input Demo</h1>
        <hr />
        <h2>Tags Input</h2>
      </div>
      <TagsInputExample />
      <hr />
    </main>
  )
}

function TagsInputExample() {
  const [input, setInput] = React.useState('')
  const [tags, setTags] = React.useState(createTags(DEFAULT_TAGS))
  return (
    <>
      <TagsInput
        inputValue={input}
        tags={tags}
        onTagsChange={setTags}
        onInputChange={setInput}
        suggestions={COUNTRIES}
      />
      <CodeViewer />
    </>
  )
}

export default App
