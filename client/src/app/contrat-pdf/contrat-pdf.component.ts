import { Component, OnInit } from '@angular/core';
import { ContratService } from '../services/contrat.service';

@Component({
  selector: 'app-contrat-pdf',
  templateUrl: './contrat-pdf.component.html',
  styleUrls: ['./contrat-pdf.component.css']
})
export class ContratPdfComponent implements OnInit {
  pdfs: any[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private contratService: ContratService) {}

  ngOnInit(): void {
    this.loadPdfs();
  }

  loadPdfs(): void {
    this.contratService. getPdfContratsByPorteur().subscribe({
      next: (data) => {
        this.pdfs = data;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err.message || 'Erreur lors du chargement des contrats PDF.';
        this.pdfs = [];
      }
    });
  }


}