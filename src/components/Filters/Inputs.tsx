import FormikInput, { FormikEssentials, FormikInputProps } from '@_components/FormikInput'
import { uniqueId } from 'lodash'
import React, { Fragment } from 'react'

export type Filter = Omit<FormikInputProps, keyof FormikEssentials >

type Props = {
    filters: Filter[]
    formik: FormikEssentials
}

const Inputs = (props: Props) => {
    const { filters = [], formik } = props
    return (
        <>
            {filters && filters.length && filters.map(filter => (
                <Fragment key={uniqueId('filter-')}>
                    <FormikInput {...filter} {...formik}  />
                </Fragment>
            ))}
        </>
    )
}

export default React.memo(Inputs)
