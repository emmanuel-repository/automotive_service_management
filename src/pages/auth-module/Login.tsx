
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaCarAlt } from "react-icons/fa";
import { AlertCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import video from "/54026.mp4";

export default function Login() {

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isErrorSession, setIsErrorSession] = useState<boolean>(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {

			const bodyData = { email, password };
			const response: Response = await fetch(`${import.meta.env.VITE_API}/login/oauth2/auth`, {
				method: 'POST',
				body: JSON.stringify(bodyData),
				headers: { "Content-Type": "application/json" },
			})

			const data: any = await response.json()

			if (!response.ok) {
				setIsErrorSession(true);
				throw new Error(data.message);
			}

			localStorage.setItem('sessionData', JSON.stringify(data));
			navigate('/manager/car', { replace: true }); 

		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>

			<div className='absolute inset-0'>
				<video className='object-cover w-full h-full  bg-gray-600 opacity-45' autoPlay muted loop 	>
					<source src={video} type="video/mp4" />
				</video>
			</div>

			<div className='relative flex justify-center items-center'>
				<form onSubmit={handleSubmit}>
					<Card className="w-[500px]">

						<CardHeader>

							<CardTitle>
								<div className="flex justify-center">
									<FaCarAlt className="size-40" />
								</div>
								<div>
									Servicios Automotriz
								</div>
							</CardTitle>

							<CardDescription>
								Gestion de Servicios Automotrices.
							</CardDescription>

						</CardHeader>

						<CardContent>

							<div className="grid w-full items-center gap-4">
								
								{isErrorSession &&
									<Alert variant="destructive">
										<AlertCircle className="h-4 w-4" />
										<AlertTitle>Error</AlertTitle>
										<AlertDescription>
											Usuario o contraseña son incorrectas.
										</AlertDescription>
									</Alert>
								}

								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="name">Correo electronico:</Label>
									<Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
								</div>

								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="name">Contraseña:</Label>
									<Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
								</div>

							</div>

						</CardContent>

						<CardFooter className="flex justify-end">
							<Button type="submit">Iniciar Sesion</Button>
						</CardFooter>
					</Card>

				</form>


			</div>

		</>
	)
}