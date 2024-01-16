import * as React from 'react'


export const appFile = `import * as React from 'react'
  import { FormProvider, useForm } from 'react-hook-form'
  import { createTags, TagsInput } from 'tags-input'
  import { TagsInputField } from 'tags-input/tags-input-field'
  import CodeViewer from 'tags-input/CodeIcon'
  
  import COUNTRIES from './countries.json'
  
  const DEFAULT_TAGS = ['Mexico', 'Canada', 'United States']
  
  const App = () => {
    return (
      <main className="mx-auto mt-12 max-w-md space-y-8">
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
  `;
export const codeIconFile = `import Editor from "@monaco-editor/react";
import { useState } from "react";
import { appFile, codeIconFile, countriesFile, tagsInputFieldFile, tagsInputFieldTestFile, tagsInputFile, tagsInputTestFile, removeButtonFile, renderSuggestionFile, indexFile, indexHtmlFile, indexMainFile, indexcssFile } from "./Codes";

function CodeViewer() {
  const [showCode, setShowCode] = useState<boolean>(false);
  const Files = [appFile, codeIconFile, countriesFile, tagsInputFieldFile, tagsInputFieldTestFile, tagsInputFile, tagsInputTestFile, removeButtonFile, renderSuggestionFile, indexFile, indexHtmlFile, indexMainFile, indexcssFile]
  const FileName = ["App.tsx", "CodeIcon.tsx", "Countries.json", "Tags-Input-Field.tsx", "Tags-Input-Field-Test.tsx", "Tags-Input.tsx", "Tags-Input-Test.tsx", "Remove-Button.tsx", "Render-Suggestion.tsx", "tags-input/index.js", "index.html", "index.tsx", "index.css"]

  const handleIconClick = () => {
    setShowCode(true);
  };
  
  const handleCloseEditor = () => {
    setShowCode(false);
  };

  return (
    <div className="code-viewer-container">
    <button onClick={handleIconClick}>Show Source Code</button>

    {showCode && (
        <div className="code-editor-container">
          {Files.map((File, index) => 
            <>
              <div>{FileName[index]}</div>
              <Editor
                height="500px"
                language="javascript"
                theme="vs-dark"
                value={File}
              />
            </>)
          }
        <button onClick={handleCloseEditor}>Close Editor</button>
      </div>
    )}
  </div>
  );
}
export default CodeViewer;
`;
export const indexFile = `export * from './tags-input'
`;
export const removeButtonFile = `import * as React from 'react'

interface RemoveButtonProps {
  onRemove: () => void
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void
  className: string
  index: number
  ariaLabel: string
}

const crossStr = String.fromCharCode(215)

export function RemoveButton({
  onRemove,
  onKeyDown,
  className,
  ariaLabel,
}: RemoveButtonProps) {
  return (
    <button
      type="button"
      onClick={onRemove}
      onKeyDown={onKeyDown}
      className={className}
      aria-label={ariaLabel}
    >
      {crossStr}
    </button>
  )
}

`;
export const renderSuggestionFile = `  import { Tag } from 'react-tag-input'

export function renderSuggestion(item: Tag, query: string) {
  return <span dangerouslySetInnerHTML={markIt(item, query)} />
}

function markIt(item: Tag, query: string) {
  const escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')
  const { text: labelValue } = item

  return {
    __html: labelValue.replace(RegExp(escapedRegex, 'gi'), x => {
      return \`<mark class="bg-blue-200 py-0.5">\${encodeURIComponent(x)}</mark>\`
    }),
  }
}

`;
export const tagsInputFieldTestFile = `import * as React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TagsInputField } from 'tags-input/tags-input-field'
import MockedFn = jest.MockedFn

describe('TagsInputField', () => {
  it('should throw when used out of \`FormProvider\` context', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(jest.fn())

    expect(() => render(<TagsInputField name="test-name" />)).toThrow()

    consoleErrorSpy.mockRestore()
  })

  it('should render \`preselectedTags\`', () => {
    const { getByText } = setup({
      defaultFieldValue: ['Switzerland', 'France'],
    })

    expect(getByText('Switzerland')).toBeInTheDocument()
    expect(getByText('France')).toBeInTheDocument()
  })

  it('submits the form with preselected tags', async () => {
    const preselectedTags = ['Switzerland', 'France']
    const { submit, getNthSubmittedValue } = setup({
      defaultFieldValue: preselectedTags,
    })

    submit()
    await waitForStateUpdate()

    expect(getNthSubmittedValue(1)).toEqual(preselectedTags)
  })

  it(
    'should submit the form with \`preselectedTags\` and input value,' +
      'then after confirming the tag, it should submit the form with the same value ',
    async () => {
      const preselectedTags = ['Switzerland', 'France']
      const { submit, getNthSubmittedValue, type } = setup({
        defaultFieldValue: preselectedTags,
      })

      const inputValue = 'Italy'
      const expected = [...preselectedTags, inputValue]

      // First submission, tag is still in the input (not added)
      type(inputValue)
      submit()
      await waitForStateUpdate()
      expect(getNthSubmittedValue(1)).toEqual(expected)

      // Second submission, tag is added after hitting ENTER
      type('{enter}')
      submit()
      await waitForStateUpdate()
      expect(getNthSubmittedValue(2)).toEqual(expected)
    },
  )

  it(\`should consecutively submit tags with input value, unless input is empty string\`, async () => {
    const tags = ['foo', 'bar']
    const { submit, getNthSubmittedValue, type } = setup({
      defaultFieldValue: tags,
    })

    type('a')
    submit()
    await waitForStateUpdate()
    expect(getNthSubmittedValue(1)).toEqual([...tags, 'a'])

    type('b')
    submit()
    await waitForStateUpdate()
    expect(getNthSubmittedValue(2)).toEqual([...tags, 'ab'])

    type('{backspace}')
    submit()
    await waitForStateUpdate()
    expect(getNthSubmittedValue(3)).toEqual([...tags, 'a'])

    type('{backspace}')
    submit()
    await waitForStateUpdate()
    expect(getNthSubmittedValue(4)).toEqual(tags)
  })

  it('should NOT submit duplicates, when \`allowDuplicates=false\` (default behavior)', async () => {
    const tags = ['baz']
    const { submit, getNthSubmittedValue, type } = setup({
      defaultFieldValue: tags,
    })

    type('baz')
    submit()
    await waitForStateUpdate()
    expect(getNthSubmittedValue(1)).toEqual(tags)
  })

  it('should allow submitting duplicates, when \`allowDuplicates=true\`', async () => {
    const tags = ['baz']
    const { submit, getNthSubmittedValue, type } = setup({
      defaultFieldValue: tags,
      allowDuplicates: true,
    })

    type('baz')
    submit()
    await waitForStateUpdate()
    expect(getNthSubmittedValue(1)).toEqual(['baz', 'baz'])
  })
})

const FIELD_NAME = 'my-tags'

function TestForm({
  onSubmit,
  defaultFieldValue,
  allowDuplicates,
}: {
  onSubmit: MockedFn<any>
  defaultFieldValue?: string[]
  allowDuplicates?: boolean
}) {
  const methods = useForm({
    defaultValues: {
      [FIELD_NAME]: defaultFieldValue,
    },
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TagsInputField name={FIELD_NAME} allowDuplicates={allowDuplicates} />
        <button data-testid="submit" type="submit">
          Submit
        </button>
      </form>
    </FormProvider>
  )
}

function setup({
  defaultFieldValue,
  allowDuplicates = false,
}: {
  defaultFieldValue: string[]
  allowDuplicates?: boolean
}) {
  const onSubmit = jest.fn()
  render(
    <TestForm
      onSubmit={onSubmit}
      defaultFieldValue={defaultFieldValue}
      allowDuplicates={allowDuplicates}
    />,
  )

  const submitButton = screen.getByTestId('submit')
  const addButton = screen.getByRole('button', { name: 'Add' })
  const input = screen.getByRole('textbox')

  const clickAddButton = () => userEvent.click(addButton)
  const type = (value: string) => userEvent.type(input, value)
  const clearInput = () => userEvent.clear(input)
  const getByText = (text: string) => screen.getByText(text)
  const submit = () => userEvent.click(submitButton)
  const getNthSubmittedValue = (n: number) =>
    onSubmit.mock.calls[n - 1][0][FIELD_NAME]

  return {
    onSubmit,
    clickAddButton,
    type,
    getByText,
    submit,
    getNthSubmittedValue,
    clearInput,
  }
}

async function waitForStateUpdate() {
  await waitFor(async () => Promise.resolve())
}
`;
export const tagsInputFieldFile = `import * as React from 'react'
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
    throw new Error('❌ \`TagsInputField\` must be used within a \`FormProvider\`')
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

  // If \`allowDuplicates=false\` remove duplicates from the field value.
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
`;
export const tagsInputTestFile = `import { Tag } from 'react-tag-input'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createTags, TagsInput } from 'tags-input'

describe('TagsInput', () => {
  it('should render TagsInput with input value, and all the tags', () => {
    const inputValue = 'input-value'
    const tags = createTags(['tag-1', 'tag-2'])
    setup({ inputValue, tags })

    expect(screen.getByRole('textbox')).toHaveValue(inputValue)
    for (const tag of tags) {
      expect(screen.getByText(tag.text)).toBeInTheDocument()
    }
  })

  it('should call \`onInputChange\` when typing in input', () => {
    const { onInputChange, type } = setup()

    const newInputValue = 'abc'
    type(newInputValue)
    expect(onInputChange).toHaveBeenCalledTimes(3)
    expect(onInputChange).toHaveBeenNthCalledWith(1, 'a')
    expect(onInputChange).toHaveBeenNthCalledWith(2, 'b')
    expect(onInputChange).toHaveBeenNthCalledWith(3, 'c')
  })

  it('should call \`onTagsChange\` when clicking on \`Add\` button and input is empty', () => {
    const { onTagsChange, clickAddButton } = setup({ inputValue: 'a' })

    clickAddButton()

    expect(onTagsChange).toHaveBeenCalledTimes(1)
    expect(onTagsChange).toHaveBeenCalledWith(createTags(['a']))
  })

  it('should call \`onTagsChange\` without the tag that delete button was clicked', () => {
    const tags = createTags(['tag-1', 'tag-2', 'tag-3'])
    const [tag1, tag2, tag3] = tags
    const { onTagsChange, clickDeleteButtonAtIndex } = setup({ tags })

    clickDeleteButtonAtIndex(0)
    expect(onTagsChange).toHaveBeenCalledWith([tag2, tag3])

    clickDeleteButtonAtIndex(1)
    expect(onTagsChange).toHaveBeenCalledWith([tag1, tag3])

    clickDeleteButtonAtIndex(2)
    expect(onTagsChange).toHaveBeenCalledWith([tag1, tag2])
  })

  it('should NOT call \`onTagsChange\` nor \`onInputChange\`, when clicking on \`Add\` button and input is empty', () => {
    const { onTagsChange, onInputChange, clickAddButton } = setup({
      inputValue: '',
    })

    clickAddButton()

    expect(onTagsChange).not.toHaveBeenCalled()
    expect(onInputChange).not.toHaveBeenCalled()
  })

  describe('when \`allowDuplicates=false\`', () => {
    it('should NOT call \`onTagsChange\` nor \`onInputChange\`, when clicking on \`Add\` button and input value is already in tags', () => {
      const { onTagsChange, onInputChange, clickAddButton } = setup({
        inputValue: 'duplicated',
        tags: createTags(['duplicated', 'a', 'b', 'c']),
        allowDuplicates: false,
      })

      clickAddButton()

      expect(onTagsChange).not.toHaveBeenCalled()
      expect(onInputChange).not.toHaveBeenCalled()
    })
  })
})

function setup(params?: {
  inputValue?: string
  tags?: Tag[]
  allowDuplicates?: boolean
}) {
  const { inputValue = '', tags = [], allowDuplicates } = params || {}
  const onInputChange = jest.fn()
  const onTagsChange = jest.fn()

  render(
    <TagsInput
      inputValue={inputValue}
      onInputChange={onInputChange}
      tags={tags}
      onTagsChange={onTagsChange}
      allowDuplicates={allowDuplicates}
    />,
  )

  const input = screen.getByRole('textbox')
  const addButton = screen.getByRole('button', {
    name: /add/i,
  })

  const type = (text: string) => userEvent.type(input, text)
  const clearInput = () => userEvent.clear(input)
  const clickAddButton = () => userEvent.click(addButton)
  const getDeleteButtonAtIndex = (i: number) =>
    screen.getByRole('button', {
      name: new RegExp(\`Tag at index \${i}.*\`, 'i'),
    })
  const clickDeleteButtonAtIndex = (i: number) =>
    userEvent.click(getDeleteButtonAtIndex(i))

  return {
    addButton,
    clearInput,
    clickAddButton,
    clickDeleteButtonAtIndex,
    input,
    onInputChange,
    onTagsChange,
    type,
  }
}
`;
export const tagsInputFile = `import * as React from 'react'
import { Tag, WithContext as ReactTags } from 'react-tag-input'
import { SearchIcon } from '@heroicons/react/outline'
import { renderSuggestion } from 'tags-input/render-suggestion'

const KeyCodes = {
  comma: 188,
  enter: 13,
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

interface TagInputProps {
  tags: Tag[]
  onTagsChange: (tags: Tag[]) => void
  inputValue: string
  onInputChange: (input: string) => void
  allowDuplicates?: boolean
  suggestions?: string[]
}

export function TagsInput({
  tags,
  onTagsChange,
  inputValue,
  onInputChange,
  allowDuplicates = false,
  suggestions = [],
}: TagInputProps) {
  const handleDelete = (i: number) => {
    onTagsChange(tags.filter((tag, index) => index !== i))
  }

  const handleAddition = (tag: Tag) => {
    // Prevent empty tags
    if (!inputValue) {
      return
    }
    // Prevent adding duplicate tags
    if (!allowDuplicates && tags.find(t => t.text === inputValue)) {
      return
    }
    onTagsChange([...tags, tag])
    onInputChange('')
  }

  // Drag & Drop
  const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
    const newTags = tags.slice()

    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag)

    // re-render
    onTagsChange(newTags)
  }

  const handleAddClick = () => {
    handleAddition({
      id: inputValue,
      text: inputValue,
    })
  }

  return (
    <div className="not-prose max-w-sm">
      <div className="relative">
        <ReactTags
          tags={tags}
          suggestions={createTags(suggestions)}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          inputValue={inputValue}
          handleInputChange={onInputChange}
          inputFieldPosition="bottom"
          renderSuggestion={renderSuggestion}
          classNames={{
            tags: 'w-full',
            selected: 'flex flex-wrap gap-2 mb-2',
            tag: 'inline-flex items-center gap-2 p-2 bg-gray-200 rounded-lg',
            tagInputField:
              'border-gray-500 border-2 rounded-lg py-2 pl-7 pr-12 w-full',
            suggestions:
              'z-50 absolute mt-2 w-full overflow-hidden rounded-lg bg-white shadow-lg',
            suggestionsList: 'max-h-64 overflow-y-auto',
            suggestionsListItem:
              'cursor-pointer p-2 text-sm text-gray-700 hover:bg-gray-100',
          }}
        />
        <SearchIcon className="absolute left-1.5 -mt-8 h-5 w-5 text-gray-500" />
        <button
          type="button"
          onClick={handleAddClick}
          className="absolute right-1.5 -mt-[38px] rounded-lg bg-blue-500 p-2 text-xs text-white"
        >
          Add
        </button>
      </div>
    </div>
  )
}

export function createTags(suggestions: string[]): Tag[] {
  return suggestions.map(createTag)
}

function createTag(suggestion: string): Tag {
  return {
    id: suggestion,
    text: suggestion,
  }
}
`;
export const countriesFile = `[
    "Afghanistan",
    "Aland Islands",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia (Plurinational State of)",
    "Bonaire, Sint Eustatius and Saba",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo (Democratic Republic of the)",
    "Cook Islands",
    "Costa Rica",
    "Cote d'voire",
    "Croatia",
    "Cuba",
    "Curacao",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands (Malvinas)",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Holy See",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea (Democratic People Republic of)",
    "Korea (Republic of)",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People",
    "Democratic Republic",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Macedonia (the former Yugoslav Republic of)",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia (Federated States of)",
    "Moldova (Republic of)",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine, State of",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "Saint Barthelemy",
    "Saint Helena, Ascension and Tristan da Cunha",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin (French part)",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten (Dutch part)",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan, Province of China[a]",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom of Great Britain and Northern Ireland",
    "United States of America",
    "United States Minor Outlying Islands",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela (Bolivarian Republic of)",
    "Viet Nam",
    "Virgin Islands (British)",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe"
  ]
  `;
export const indexHtmlFile = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the \`public\` folder during the build.
      Only files inside the \`public\` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running \`npm run build\`.
    -->
    <title>React Tag Input Demo</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run \`npm start\` or \`yarn start\`.
      To create a production bundle, use \`npm run build\` or \`yarn build\`.
    -->
  </body>
</html>
`;
export const indexcssFile = `@tailwind base;
@tailwind components;
@tailwind utilities;
/* CodeViewer.css */

.code-viewer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.code-editor-container {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
}

button {
  margin-top: 10px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;
}
`;
export const indexMainFile = `import './index.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
`;

  