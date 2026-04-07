import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export function usePdfGenerator() {
  const downloadAsPdf = async (elementId: string, fileName: string = 'document.pdf') => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('PDF Export Error: Element not found:', elementId);
      return;
    }

    try {
      // Create a loading toast or indicator if needed (optional)
      console.log('Starting PDF generation for:', elementId);

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById(elementId);
          if (clonedElement) {
            // Ensure the cloned element is fully expanded and visible
            clonedElement.style.height = 'auto';
            clonedElement.style.maxHeight = 'none';
            clonedElement.style.overflow = 'visible';
            clonedElement.style.display = 'block';
            clonedElement.style.width = `${element.scrollWidth}px`;
            
            // Expand all parents in the clone to prevent clipping
            let parent = clonedElement.parentElement;
            while (parent && parent.tagName !== 'HTML') {
              parent.style.height = 'auto';
              parent.style.maxHeight = 'none';
              parent.style.overflow = 'visible';
              parent = parent.parentElement;
            }

            // Fix dark mode text visibility: Convert all light text to dark
            const allTextElements = clonedElement.querySelectorAll('*');
            allTextElements.forEach((el) => {
              const htmlEl = el as HTMLElement;
              const style = clonedDoc.defaultView?.getComputedStyle(htmlEl);
              if (style) {
                const color = style.color;
                // If text is white or very light, force it to black for the PDF
                if (color === 'rgb(255, 255, 255)' || color === 'white' || color.includes('255, 255, 255') || color === 'rgba(255, 255, 255, 1)') {
                  htmlEl.style.setProperty('color', '#000000', 'important');
                }
                
                // Ensure backgrounds that might be dark are handled
                const bgColor = style.backgroundColor;
                if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
                  // Optional: handle dark backgrounds if they make text unreadable
                }
              }
            });

            // Special handling for SVGs (like the score circle in Content Analyzer)
            const svgs = clonedElement.querySelectorAll('svg');
            svgs.forEach(svg => {
              svg.setAttribute('width', svg.getBoundingClientRect().width.toString());
              svg.setAttribute('height', svg.getBoundingClientRect().height.toString());
            });
          }
        }
      });

      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error('Canvas capture resulted in zero dimensions.');
      }

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      // Add content to PDF, handling multiple pages if necessary
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;
      }

      pdf.save(fileName);
      console.log('PDF generation successful:', fileName);
    } catch (error) {
      console.error('PDF Export Error:', error);
      // Fallback: try to download as text if it's a text-heavy element
      // Or just inform the user via console
    }
  };

  const downloadTextAsPdf = (text: string, fileName: string = 'document.pdf') => {
    if (!text) {
      console.error('No text provided for PDF generation');
      return;
    }

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const margin = 20;
      const pageWidth = pdf.internal.pageSize.width;
      const pageHeight = pdf.internal.pageSize.height;
      const contentWidth = pageWidth - (margin * 2);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      
      const lines = pdf.splitTextToSize(text, contentWidth);
      let cursorY = margin;
      
      lines.forEach((line: string) => {
        if (cursorY + 7 > pageHeight - margin) {
          pdf.addPage();
          cursorY = margin;
        }
        pdf.text(line, margin, cursorY);
        cursorY += 7;
      });
      
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF from text:', error);
    }
  };

  return { downloadAsPdf, downloadTextAsPdf };
}
