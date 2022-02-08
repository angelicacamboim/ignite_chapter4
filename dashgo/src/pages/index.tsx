import { Flex, Button, Stack } from '@chakra-ui/react'
import { Input } from '../components/Form/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type SignInFormData = {
	email: string
	password: string
}

const signInFormSchema = yup.object().shape({
	email: yup.string().required('Email obrigatório').email('Email inválido'),
	password: yup.string().required('Senha obrigatória')
})

//todos flex são divs
export default function SignIn() {
	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit
	} = useForm({
		resolver: yupResolver(signInFormSchema)
	})

	const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
		await new Promise((resolve) => setTimeout(resolve, 20000))

		console.log(values)
	}

	return (
		<Flex w="100vw" h="100vh" align="center" justify="center">
			<Flex
				as="form"
				w="30vw"
				max-width={360}
				bg="gray.800"
				p="8"
				borderRadius={8}
				flexDir="column"
				onSubmit={handleSubmit(handleSignIn)}
			>
				<Stack spacing="4">
					<Input
						type="email"
						name="email"
						label="E-mail"
						error={errors.email}
						{...register('email')}
					/>
					<Input
						type="password"
						name="password"
						label="Password"
						error={errors.password}
						{...register('password')}
					/>
				</Stack>
				<Button
					type="submit"
					mt="6"
					colorScheme="pink"
					size="lg"
					isLoading={isSubmitting}
				>
					Entrar
				</Button>
			</Flex>
		</Flex>
	)
}
