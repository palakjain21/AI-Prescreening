# AI Screening Questions Builder

## Overview

This project implements a comprehensive screening questions builder with full CRUD operations and advanced features. All mandatory functionalities from the assignment have been successfully implemented, along with additional enhancements.

---

## Core Features

### Question Management

- **Complete CRUD Operations**
  - Create, read, update, and delete questions
  - Hover-based add/delete controls for intuitive interaction

- **Question Addition**
  - Add question after the current item
  - Add question at the end of the list

- **Question Deletion**
  - Delete questions with edge-case handling
  - First question is not deletable when only one exists

### Question Configuration

- **Editable Question Titles**
  - Inline editing with auto-save functionality

- **Question Type Selection**
  - Single Choice
  - Multiple Choice
  - Free Text

- **Advanced Options**
  - **Disqualifier Toggle**: Mark questions as disqualifiers
  - **Enable Scoring Toggle**: Enable/disable scoring with validations
  - **Score Input Validation**: Red border for score input with value "0" when scoring is enabled

### User Experience

- **Auto-save**: Automatically saves changes when clicking outside the question card
- **Drag and Drop**: Reorder questions using intuitive drag-and-drop functionality

---

## Tech Stack

### Libraries & Frameworks

- **React DnD**: Drag and drop reordering of questions
- **Redux Persist**: State persistence across sessions
- **Ant Design Icons**: Icon library for UI elements
- **Tailwind CSS**: Utility-first CSS framework for styling

### Architecture

- **Custom Components**: All components built from scratch without component libraries
- **Design Pattern**: Followed Radix UI-inspired patterns for:
  - Modularity
  - Scalability
  - Maintainability

---

## Implementation Notes

### Design Considerations

While implementing the UI, several design decisions were made based on the provided Figma design:

1. **Color Tokens**
   - Colors have been matched as closely as possible to the design(Some color tokens in Figma had duplicate names with different hex values)

2. **Component States**
   - Consistent styles aligned with the given theme have been applied( for states like- Hover, active, and focus, which were not fully specified in the design)

3. **Tailwind Configuration**
   - Due to time constraints, a full Tailwind config with all custom tokens (fonts, spacing, radius) was not created but the current structure supports easy extension for future customization

### Known Limitations

- **Accessibility**: Focus states, ARIA labels, and keyboard navigation are currently minimal and can be improved further.

---

## Future Improvements

- Enhanced accessibility features (ARIA labels, keyboard navigation)
- Complete Tailwind configuration with all custom design tokens
- Additional component states (hover, active, focus) refinement
- Comprehensive test coverage

---

*Note: I hope these design assumptions are acceptable, and I would be happy to make adjustments if needed.*
