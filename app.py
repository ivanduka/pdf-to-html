from PyPDF2 import PdfFileReader

if __name__ == "__main__":
    input1 = PdfFileReader(open("./pdf/A78970-2_Supplemental_ESA_-_Part_1_of_3_-_A5E4Z2.pdf", 'rb'))
    size = input1.getPage(0).mediaBox
    print(size)
