import React from 'react'
import { Button, Spinner } from 'flowbite-react'

export default function AppButton({children, isLoading, ...props}) {
    return (
      <Button type="submit" {...props}>
        {isLoading && <Spinner
            size="sm"
            aria-label="info spinner example"
            className="me-3"
            light
            >
        </Spinner>}
        {children}
      </Button>
    );
}
