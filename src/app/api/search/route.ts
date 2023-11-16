import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import csvParser from 'csv-parser';
import path from 'path';

export function GET(req: NextRequest): Promise<Response> {
    
    const searchTerm = req.nextUrl.searchParams;
    const name = searchTerm.get('name')?.toLowerCase();
    let result: { name: string; value: string; label1: string; label2: string; label3: string } | null = null;

    
    const filePath = path.join(process.cwd(), 'public', 'data.csv'); 

    // Read the CSV file and parse it
    return new Promise<Response>((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                if (row.name.toLowerCase().includes(name)) {
                    result = { 
                        name: row.name, 
                        value: row.value, 
                        label1: row.label1, 
                        label2: row.label2, 
                        label3: row.label3 
                    };
                }
            })
            .on('end', () => {
                if (result) {
                    resolve(NextResponse.json(result));
                } else {
                    resolve(NextResponse.json({ message: 'No match found' }));
                }
            })
            .on('error', (err) => {
                reject(NextResponse.error());
            });
    });
}