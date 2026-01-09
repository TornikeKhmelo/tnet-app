import React from 'react'
import { ActionButton, ActionIcon, Actions } from './styles'

const ActionButtons = () => {
  return (
        <Actions>
          <ActionButton title="რედაქტირება">
             <ActionIcon src="/note.svg" alt="Edit" />
          </ActionButton>
          <ActionButton title="შედარება">
            <ActionIcon src="/shedareba.svg" alt="Compare" />
          </ActionButton>
          <ActionButton title="მოწონება">
            <ActionIcon src="/favorite.svg" alt="Favorite" />
          </ActionButton>
        </Actions>
  )
}

export default ActionButtons
