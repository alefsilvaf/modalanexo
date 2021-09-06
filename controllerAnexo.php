<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AnexoService;
use Google\Cloud\Core\Timestamp;
use Illuminate\Support\Facades\Storage;


class AnexoController extends Controller
{
  public function __construct(AnexoService $anexo_sec)
  {
    parent::__construct($anexo_sec);
  }
  public function index()
  {
    return $this->service->index();
  }

  public function show($id)
  {
    return $this->service->show($id);
  }

  public function store(Request $request)
  {
    $data = $request->all();
    return $this->service->store($data);
  }

  public function update($id, Request $request)
  {
    $data = $request->all();
    return $this->service->update($id, $data);
  }

  public function findByCliente($id)
  {
    return $this->service->findByCliente($id);
  }

  public function destroy($id)
  {
    return $this->service->delete($id);
  }

  public function storeUpdate(Request $request)
  {

    $data = $request->all();
    $prefixUrl = 'https://storage.googleapis.com/bucketname/';

    if ($request->hasFile('cnh')) {
      $archiveName = '' $request->cnh->getClientOriginalExtension();
      $request->cnh->storeAs('cnhfrente', $archiveName, 'gcs');
      $newLink = $prefixUrl . 'cnhfrente/' . $archiveName;
      $data['cnh'] = $newLink;
    }
    if ($request->hasFile('cnh2')) {
      $archiveName = '' $request->cnh2->getClientOriginalExtension();
      $request->cnh2->storeAs('cnhverso', $archiveName, 'gcs');
      $newLink = $prefixUrl . 'cnhverso/' . $archiveName;
      $data['cnh2'] = $newLink;
    }
    if ($request->hasFile('cpf')) {
      $archiveName = '' $request->cpf->getClientOriginalExtension();
      $request->cpf->storeAs('cpffrente', $archiveName, 'gcs');
      $newLink = $prefixUrl . 'cpffrente/' . $archiveName;
      $data['cpf'] = $newLink;
    }
    if ($request->hasFile('cpf2')) {
      $archiveName = '' $request->cpf2->getClientOriginalExtension();
      $request->cpf2->storeAs('cpfverso', $archiveName, 'gcs');
      $newLink = $prefixUrl . 'cpfverso/' . $archiveName;
      $data['cpf2'] = $newLink;
    }
    if ($request->hasFile('rg')) {
      $archiveName = '' $request->rg->getClientOriginalExtension();
      $request->rg->storeAs('rgfrente', $archiveName, 'gcs');
      $newLink = $prefixUrl . 'rgfrente/' . $archiveName;
      $data['rg'] = $newLink;
    }
    if ($request->hasFile('rg2')) {
      $archiveName = '' $request->cnh->getClientOriginalExtension();
      $request->rg2->storeAs('rgverso', '' $request->rg2->getClientOriginalExtension(), 'gcs');
      $newLink = $prefixUrl . 'rgverso/' . '' $request->rg2->getClientOriginalExtension();
      $data['rg2'] = $newLink;
    }
    if ($request->hasFile('comprovante_endereco')) {
      $archiveName = '' $request->comprovante_endereco->getClientOriginalExtension();
      $request->comprovante_endereco->storeAs('comprovante_endereco', $archiveName, 'gcs');
      $newLink = $prefixUrl . 'comprovante_endereco/' . $archiveName;
      $data['comprovante_endereco'] = $newLink;
    }
    if ($request->hasFile('certidao_casamento')) {
      $archiveName = '' $request->certidao_casamento->getClientOriginalExtension();
      $request->certidao_casamento->storeAs('certidao_casamento',  $archiveName, 'gcs');
      $newLink = $prefixUrl . 'certidao_casamento/' .  $archiveName;
      $data['certidao_casamento'] = $newLink;
    }
    if ($request->hasFile('matricula')) {
      $archiveName = '' $request->matricula->getClientOriginalExtension();
      $request->matricula->storeAs('matricula', $archiveName, 'gcs');
      $newLink = $prefixUrl . 'matricula/' . $archiveName;
      $data['matricula'] = $newLink;
    }
    if ($request->hasFile('contrato_arrendamento')) {
      $archiveName = '' $request->contrato_arrendamento->getClientOriginalExtension();
      $request->contrato_arrendamento->storeAs('contrato_arrendamento', $archiveName, 'gcs');
      $newLink = $prefixUrl . 'contrato_arrendamento/' . $archiveName;
      $data['contrato_arrendamento'] = $newLink;
    }
    if ($request->hasFile('outros')) {
      $archiveName = '' $request->outros->getClientOriginalExtension();
      $request->outros->storeAs('outros', $archiveName, 'gcs');
      $newLink = $prefixUrl . 'outros/' . $archiveName;
      $data['outros'] = $newLink;
    }
    return $this->service->storeUpdate($data);
  }
}
