<?php

namespace App\Controller;

header('Access-Control-Allow-Origin: *');

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpFoundation\JsonResponse;

class EmployeeController extends AbstractController
{
    public function employees()
    {
        $em = $this->getDoctrine()->getManager();

        $query = $em->createQuery('SELECT c.id, c.name, c.address, c.salary, c.registered, c.updated, c.status, c.id_office FROM App:Employee c');
        $listEmployees = $query->getResult();

        $data = [
            'status' => 200,
            'mesage' => 'No hay registros en la base de datos :D',
        ];

        if(count($listEmployees) > 0){
            $data = [
                'status' => 200,
                'mesage' => 'Se encontraron ' . count($listEmployees) . ' resultados',
                'listEmployees' => $listEmployees
            ];
        }

        return new JsonResponse($data);
    }

    public function create(Request $request){
        $em = $this->getDoctrine()->getManager();
        
        $name = $request->get('name', null);
        $address = $request->get('address', null);
        $salary = $request->get('salary', null);
        $registered = $request->get('registered', null);
        $updated = $request->get('updated', null);
        $idOffice = $request->get('id_office', null);

        $employee = new \App\Entity\Employee();

        $employee->setName($name);
        $employee->setAddress($street);
        $employee->setSalary($salary);
        $employee->setRegistered($registered);
        $employee->setUpdated($updated);
        $employee->setStatus(1);
        $employee->setIdOffice($idOffice);

        $em->persist($employee);
        $em->flush();

        $data = [
            'status' => 200,
            'message' => 'Registro exitoso :D'
        ];

        return new JsonResponse($data);
    }

    public function update(Request $request, $id){
        $em = $this->getDoctrine()->getManager();
        
        $name = $request->get('name', null);
        $address = $request->get('address', null);
        $salary = $request->get('salary', null);
        $registered = $request->get('registered', null);
        $updated = $request->get('updated', null);
        $idOffice = $request->get('id_office', null);

        $query = $em->createQuery('UPDATE App:Employee c SET c.name = :name, c.address = :address, c.salary = :salary, c.registered = :registered,
         c.updated = :updated, c.idOffice = :id_office WHERE c.id = :id');
        $query->setParameter(':name', $name);
        $query->setParameter(':address', $address);
        $query->setParameter(':salary', $salary);
        $query->setParameter(':registered', $registered);
        $query->setParameter(':updated', $updated);
        $query->setParameter(':id_office', $idOffice);
        $query->setParameter(':id', $id);
        $flag = $query->getResult();

        if($flag == 1){
            $data = [ 'status' => 200, 'message' => 'Se ha actualizado correctamente :D' ];
        } else {
            $data = [ 'status' => 400, 'message' => 'No se ha actualizado correctamente :O' ];
        }

        return new JsonResponse($data);
    }

    public function delete($id){
        $em = $this->getDoctrine()->getManager();

        $query = $em->createQuery('UPDATE App:Employee c SET c.status = 0 WHERE c.id = :id');
        $query->setParameter(':id', $id);
        $school = $query->getResult();

        $data = [
            'status' => 200,
            'message' => 'Se deshabilitó el empleado :O',
            'school' => $school
        ];

        return new JsonResponse($data);
    }
}
