import { Box, Text, Input, Button } from "@chakra-ui/react"

import React from 'react';
import { Formik } from 'formik';

const ProjectConfig = () => (
    <Box>
        <Text>Config variables</Text>
        <Formik
            initialValues={{ email: '', password: '' }}

            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    {errors.email && touched.email && errors.email}
                    <Input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    {errors.password && touched.password && errors.password}
                    <Button type="submit" disabled={isSubmitting}>
                        Submit
                    </Button>

                    <pre>{JSON.stringify(values, null, 2)}</pre>
                </form>
            )}
        </Formik>
    </Box>
);

export default ProjectConfig;