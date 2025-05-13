"use client"

import { useState, useRef, useEffect } from "react"
import "../styles/CodeEditor.css"

const CodeEditor = ({ value, onChange, placeholder }) => {
  const textareaRef = useRef(null)
  const lineNumbersRef = useRef(null)
  const [lineCount, setLineCount] = useState(1)

  // Actualiza los números de línea cuando cambia el contenido
  useEffect(() => {
    const lineCount = value.split("\n").length
    setLineCount(lineCount)
  }, [value])

  // Sincroniza el scroll entre el textarea y los números de línea
  const handleScroll = () => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }

  // Genera los números de línea
  const getLineNumbers = () => {
    let numbers = ""
    for (let i = 1; i <= lineCount; i++) {
      numbers += `${i}\n`
    }
    return numbers
  }

  // Maneja la tecla Tab para indentación
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const start = e.target.selectionStart
      const end = e.target.selectionEnd

      // Inserta un tab en la posición del cursor
      const newValue = value.substring(0, start) + "    " + value.substring(end)
      onChange({ target: { value: newValue } })

      // Mueve el cursor después del tab
      setTimeout(() => {
        textareaRef.current.selectionStart = start + 4
        textareaRef.current.selectionEnd = start + 4
      }, 0)
    }
  }

  return (
    <div className="code-editor">
      <div className="line-numbers" ref={lineNumbersRef}>
        <pre>{getLineNumbers()}</pre>
      </div>
      <textarea
        ref={textareaRef}
        className="code-textarea"
        value={value}
        onChange={onChange}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        spellCheck="false"
      />
    </div>
  )
}

export default CodeEditor
